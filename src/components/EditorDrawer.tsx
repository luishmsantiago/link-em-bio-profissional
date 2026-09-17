import React, { useState } from 'react';
import {
  X,
  User,
  Palette,
  LayoutGrid,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  Save,
  Check,
  Edit2,
  Image,
  MapPin,
  Video,
  Phone,
  Link,
  Sliders,
  Type,
  FileText,
} from 'lucide-react';
import { BioBlock, BlockType, ProfileData } from '../types';
import { THEMES } from '../data/defaultBioData';
import { whatsappLink } from '../config/siteContent';
import { fixImageUrl } from '../utils/imageUtils';

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onUpdateProfile: (updated: ProfileData) => void;
  blocks: BioBlock[];
  onUpdateBlocks: (updated: BioBlock[]) => void;
  onResetDefaults: () => void;
}

export const EditorDrawer: React.FC<EditorDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  blocks,
  onUpdateBlocks,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'socials' | 'blocks' | 'themes'>('profile');
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Profile update helpers
  const handleProfileChange = (field: keyof ProfileData, value: any) => {
    onUpdateProfile({ ...profile, [field]: value });
  };

  const handleSocialChange = (socialKey: string, value: string) => {
    onUpdateProfile({
      ...profile,
      socials: {
        ...profile.socials,
        [socialKey]: value,
      },
    });
  };

  // Block reordering & toggling
  const handleToggleBlock = (id: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));
    onUpdateBlocks(updated);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const reordered = [...blocks];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);
    onUpdateBlocks(reordered);
  };

  const handleDeleteBlock = (id: string) => {
    const filtered = blocks.filter((b) => b.id !== id);
    onUpdateBlocks(filtered);
  };

  const handleUpdateBlockData = (id: string, updatedFields: Partial<BioBlock>) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, ...updatedFields } : b));
    onUpdateBlocks(updated);
  };

  const handleAddBlock = (type: BlockType) => {
    const newId = `block_${Date.now()}`;
    let newBlock: BioBlock = {
      id: newId,
      type,
      enabled: true,
      title: 'Novo Bloco',
      subtitle: 'Descrição ou sub-link do seu bloco personalizado',
      url: whatsappLink(),
    };

    if (type === 'GRID_CARDS') {
      newBlock.gridItems = [
        {
          id: 'g1',
          title: 'Primeiro Card',
          subtitle: 'Detalhes da apresentação',
          imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
          url: '#',
        },
        {
          id: 'g2',
          title: 'Segundo Card',
          subtitle: 'Detalhes da clínica',
          imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
          url: '#',
        },
      ];
    } else if (type === 'SERVICES_LIST') {
      newBlock.services = [
        { id: 's1', title: 'Consulta Geral', description: 'Atendimento clínico com terapias manuais.' },
        { id: 's2', title: 'Exames Especializados', description: 'Diagnóstico por imagem e laboratório.' },
      ];
    } else if (type === 'PHOTO_GALLERY') {
      newBlock.title = 'Galeria de Fotos';
      newBlock.subtitle = 'Fotos do consultório e estrutura';
      newBlock.galleryImages = [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500' },
      ];
    } else if (type === 'LOCATION_MAP') {
      newBlock.title = 'Localização';
      newBlock.mapAddress = 'Av. Paulista, 1000, São Paulo';
      newBlock.mapEmbedUrl = 'https://maps.google.com/maps?q=Av.%20Paulista%2C%201000%2C%20S%C3%A3o%20Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed';
      newBlock.buttonText = 'Abrir GPS';
    }

    onUpdateBlocks([...blocks, newBlock]);
    setEditingBlockId(newId);
  };

  const handleSaveClick = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-sky-400" />
          <h2 className="font-bold text-base text-white">Painel de Edição</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveClick}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? 'Salvo!' : 'Salvar'}</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="grid grid-cols-4 bg-slate-950/60 border-b border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-sky-400 text-sky-400 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Perfil</span>
        </button>
        <button
          onClick={() => setActiveTab('socials')}
          className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
            activeTab === 'socials'
              ? 'border-sky-400 text-sky-400 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Link className="w-4 h-4" />
          <span>Redes</span>
        </button>
        <button
          onClick={() => setActiveTab('blocks')}
          className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
            activeTab === 'blocks'
              ? 'border-sky-400 text-sky-400 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Blocos</span>
        </button>
        <button
          onClick={() => setActiveTab('themes')}
          className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
            activeTab === 'themes'
              ? 'border-sky-400 text-sky-400 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Temas</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              Informações do Profissional
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nome de Exibição</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Especialidade / Subtítulo</label>
              <input
                type="text"
                value={profile.specialty}
                onChange={(e) => handleProfileChange('specialty', e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">CREFITO 10</label>
              <input
                type="text"
                value={profile.crefito}
                onChange={(e) => handleProfileChange('crefito', e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Biografia Resumida</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">URL da Foto de Perfil</label>
              <input
                type="text"
                value={profile.avatarUrl}
                onChange={(e) => {
                  handleProfileChange('avatarUrl', fixImageUrl(e.target.value));
                }}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">Selecione uma foto da pasta de imagens ou amostra:</p>
              <div className="flex gap-2 mt-2">
                {[
                  '/images/avatar.jpg',
                  '/images/logo_luis.png',
                  '/images/sobre_eu.jpg',
                  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600',
                ].map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleProfileChange('avatarUrl', url)}
                    className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 hover:border-sky-400 transition-colors"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">URL da Foto (Página Sobre Mim)</label>
              <input
                type="text"
                value={profile.aboutImageUrl || '/images/sobre_eu.jpg'}
                onChange={(e) => handleProfileChange('aboutImageUrl', e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">Selecione a foto para o cartão "Sobre Meu Trabalho":</p>
              <div className="flex gap-2 mt-2">
                {[
                  '/images/sobre_eu.jpg',
                  '/images/avatar.jpg',
                  '/images/logo_luis.png',
                ].map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleProfileChange('aboutImageUrl', url)}
                    className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 hover:border-sky-400 transition-colors"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Deseja resetar todas as imagens e dados armazenados para o padrão original?')) {
                    localStorage.removeItem('ldue_profile');
                    localStorage.removeItem('ldue_blocks');
                    localStorage.removeItem('ldue_schema');
                    window.location.reload();
                  }
                }}
                className="w-full py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Limpar Cache & Resetar Imagens Padrão</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Texto da Página Sobre Mim</label>
              <textarea
                rows={5}
                value={profile.aboutText || ''}
                placeholder="Escreva sua trajetória profissional, técnicas e diferenciais..."
                onChange={(e) => handleProfileChange('aboutText', e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SOCIAL LINKS */}
        {activeTab === 'socials' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              Links Sociais e de Contato
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">WhatsApp (Número ou Link)</label>
              <input
                type="text"
                value={profile.socials.whatsapp || ''}
                onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                placeholder="https://wa.me/5547999383804"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Instagram</label>
              <input
                type="text"
                value={profile.socials.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/dr.luishenriquesantiago"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn</label>
              <input
                type="text"
                value={profile.socials.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/seu-nome"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Facebook</label>
              <input
                type="text"
                value={profile.socials.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                placeholder="https://facebook.com/DR.LUISHENRIQUESANTIAGO/"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Twitter / X</label>
              <input
                type="text"
                value={profile.socials.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/dr.luishenriquesantiago"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">E-mail Profissional</label>
              <input
                type="text"
                value={profile.socials.email || ''}
                onChange={(e) => handleSocialChange('email', e.target.value)}
                placeholder="drluisfisio@hotmail.com"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
        )}

        {/* TAB 3: BLOCKS MANAGER */}
        {activeTab === 'blocks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Gerenciador de Blocos
              </h3>
              <button
                onClick={onResetDefaults}
                className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                title="Restaurar visual padrão do modelo LDue"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar Padrão</span>
              </button>
            </div>

            {/* Quick Add Block Bar */}
            <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Adicionar Novo Bloco:</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <button
                  onClick={() => handleAddBlock('LINK_ICON')}
                  className="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg text-left font-medium flex items-center gap-1.5 border border-slate-700"
                >
                  <Link className="w-3 h-3 text-sky-400" /> Link c/ Ícone
                </button>
                <button
                  onClick={() => handleAddBlock('LINK_IMAGE')}
                  className="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg text-left font-medium flex items-center gap-1.5 border border-slate-700"
                >
                  <Image className="w-3 h-3 text-emerald-400" /> Link c/ Imagem
                </button>
                <button
                  onClick={() => handleAddBlock('GRID_CARDS')}
                  className="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg text-left font-medium flex items-center gap-1.5 border border-slate-700"
                >
                  <LayoutGrid className="w-3 h-3 text-indigo-400" /> Cards Duplos
                </button>
                <button
                  onClick={() => handleAddBlock('LARGE_HIGHLIGHT')}
                  className="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg text-left font-medium flex items-center gap-1.5 border border-slate-700"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> Destaque Grande
                </button>
                <button
                  onClick={() => handleAddBlock('SERVICES_LIST')}
                  className="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg text-left font-medium flex items-center gap-1.5 border border-slate-700"
                >
                  <FileText className="w-3 h-3 text-teal-400" /> Lista Serviços
                </button>
                <button
                  onClick={() => handleAddBlock('LOCATION_MAP')}
                  className="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg text-left font-medium flex items-center gap-1.5 border border-slate-700"
                >
                  <MapPin className="w-3 h-3 text-red-400" /> Mapa Local
                </button>
              </div>
            </div>

            {/* Existing Blocks List */}
            <div className="space-y-2">
              {blocks.map((block, idx) => (
                <div
                  key={block.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    block.enabled
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-slate-950/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-slate-500 w-4">#{idx + 1}</span>
                      <span className="text-xs font-bold text-white truncate max-w-[140px]">
                        {block.title || block.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Edit Fields button */}
                      <button
                        onClick={() => setEditingBlockId(editingBlockId === block.id ? null : block.id)}
                        className={`p-1.5 rounded-lg text-xs ${
                          editingBlockId === block.id ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-700'
                        }`}
                        title="Editar conteúdo do bloco"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Enable/Disable toggle */}
                      <button
                        onClick={() => handleToggleBlock(block.id)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
                        title={block.enabled ? 'Ocultar' : 'Exibir'}
                      >
                        {block.enabled ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      {/* Reorder Up */}
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveBlock(idx, 'up')}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Reorder Down */}
                      <button
                        disabled={idx === blocks.length - 1}
                        onClick={() => handleMoveBlock(idx, 'down')}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteBlock(block.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Block Fields Editor */}
                  {editingBlockId === block.id && (
                    <div className="mt-3 pt-3 border-t border-slate-700 space-y-2.5 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400">Título</label>
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) => handleUpdateBlockData(block.id, { title: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      {block.subtitle !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400">Subtítulo / Descrição</label>
                          <input
                            type="text"
                            value={block.subtitle || ''}
                            onChange={(e) => handleUpdateBlockData(block.id, { subtitle: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      )}

                      {block.url !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400">URL / Destino</label>
                          <input
                            type="text"
                            value={block.url || ''}
                            onChange={(e) => handleUpdateBlockData(block.id, { url: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      )}

                      {block.imageUrl !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400">URL da Imagem</label>
                          <input
                            type="text"
                            value={block.imageUrl || ''}
                            onChange={(e) => handleUpdateBlockData(block.id, { imageUrl: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateBlockData(block.id, { imageUrl: '/images/avatar.jpg' })}
                              className="text-[10px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-slate-700 font-medium"
                            >
                              Usar avatar.jpg
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateBlockData(block.id, { imageUrl: '/images/logo_luis.png' })}
                              className="text-[10px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-slate-700 font-medium"
                            >
                              Usar logo_luis.png
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateBlockData(block.id, { imageUrl: '/images/sobre_eu.jpg' })}
                              className="text-[10px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-slate-700 font-medium"
                            >
                              Usar sobre_eu.jpg
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Carousel Items Editor */}
                      {block.carouselItems && block.carouselItems.length > 0 && (
                        <div className="space-y-3 mt-3 pt-3 border-t border-slate-700">
                          <div className="flex items-center justify-between">
                            <label className="block text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                              Itens do Carrossel de Terapias
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = [
                                  ...(block.carouselItems || []),
                                  {
                                    id: `c_${Date.now()}`,
                                    title: 'Nova Terapia',
                                    description: 'Descrição da terapia.',
                                    imageUrl: '/images/logo_luis.png',
                                  },
                                ];
                                handleUpdateBlockData(block.id, { carouselItems: newItems });
                              }}
                              className="px-2 py-0.5 text-[10px] bg-sky-600 hover:bg-sky-500 text-white rounded-md font-bold"
                            >
                              + Adicionar Terapia
                            </button>
                          </div>

                          {block.carouselItems.map((item, itemIdx) => (
                            <div key={item.id} className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-700/80 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-400 font-bold">Item #{itemIdx + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = block.carouselItems!.filter((_, idx) => idx !== itemIdx);
                                    handleUpdateBlockData(block.id, { carouselItems: updated });
                                  }}
                                  className="text-[10px] text-red-400 hover:text-red-300 font-bold"
                                >
                                  Excluir
                                </button>
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">Nome da Terapia</label>
                                <input
                                  type="text"
                                  value={item.title || ''}
                                  onChange={(e) => {
                                    const updated = block.carouselItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, title: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { carouselItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">Descrição</label>
                                <textarea
                                  rows={2}
                                  value={item.description || ''}
                                  onChange={(e) => {
                                    const updated = block.carouselItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, description: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { carouselItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">URL da Imagem</label>
                                <input
                                  type="text"
                                  value={item.imageUrl || ''}
                                  onChange={(e) => {
                                    const updated = block.carouselItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, imageUrl: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { carouselItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {[
                                    { label: 'Microfisio', url: '/images/microfisio.jpeg' },
                                    { label: 'Osteo', url: '/images/osteo.png' },
                                    { label: 'Terapia Manual', url: '/images/terapia_manual.jpeg' },
                                    { label: 'DNM', url: '/images/dmn.jpeg' },
                                  ].map((p) => (
                                    <button
                                      key={p.url}
                                      type="button"
                                      onClick={() => {
                                        const updated = block.carouselItems!.map((it, idx) =>
                                          idx === itemIdx ? { ...it, imageUrl: p.url } : it
                                        );
                                        handleUpdateBlockData(block.id, { carouselItems: updated });
                                      }}
                                      className="text-[9px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-sky-300 border border-slate-700 font-semibold"
                                    >
                                      {p.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Video Items Editor */}
                      {block.videoItems && block.videoItems.length > 0 && (
                        <div className="space-y-3 mt-3 pt-3 border-t border-slate-700">
                          <div className="flex items-center justify-between">
                            <label className="block text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                              Vídeos do Carrossel
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = [
                                  ...(block.videoItems || []),
                                  {
                                    id: `v_${Date.now()}`,
                                    title: 'Novo Vídeo',
                                    videoYoutubeId: 'dQw4w9WgXcQ',
                                    videoThumbnailUrl: '/images/logo_luis.png',
                                  },
                                ];
                                handleUpdateBlockData(block.id, { videoItems: newItems });
                              }}
                              className="px-2 py-0.5 text-[10px] bg-rose-600 hover:bg-rose-500 text-white rounded-md font-bold"
                            >
                              + Adicionar Vídeo
                            </button>
                          </div>

                          {block.videoItems.map((item, itemIdx) => (
                            <div key={item.id} className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-700/80 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-400 font-bold">Vídeo #{itemIdx + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = block.videoItems!.filter((_, idx) => idx !== itemIdx);
                                    handleUpdateBlockData(block.id, { videoItems: updated });
                                  }}
                                  className="text-[10px] text-red-400 hover:text-red-300 font-bold"
                                >
                                  Excluir
                                </button>
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">Título do Vídeo</label>
                                <input
                                  type="text"
                                  value={item.title || ''}
                                  onChange={(e) => {
                                    const updated = block.videoItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, title: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { videoItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">URL do Vídeo (MP4)</label>
                                <input
                                  type="text"
                                  value={item.videoUrl || ''}
                                  placeholder="/videos/microfisio.mp4"
                                  onChange={(e) => {
                                    const updated = block.videoItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, videoUrl: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { videoItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {[
                                    { label: 'Microfisio', url: '/videos/microfisio.mp4' },
                                    { label: 'Osteo', url: '/videos/osteo.mp4' },
                                    { label: 'Terapia Manual', url: '/videos/terapia_manual.mp4' },
                                    { label: 'DNM', url: '/videos/dnm.mp4' },
                                  ].map((p) => (
                                    <button
                                      key={p.url}
                                      type="button"
                                      onClick={() => {
                                        const updated = block.videoItems!.map((it, idx) =>
                                          idx === itemIdx ? { ...it, videoUrl: p.url } : it
                                        );
                                        handleUpdateBlockData(block.id, { videoItems: updated });
                                      }}
                                      className="text-[9px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-rose-300 border border-slate-700 font-semibold"
                                    >
                                      {p.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">ID YouTube (Opcional)</label>
                                <input
                                  type="text"
                                  value={item.videoYoutubeId || ''}
                                  onChange={(e) => {
                                    const updated = block.videoItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, videoYoutubeId: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { videoItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 font-semibold">URL da Capa (Thumbnail)</label>
                                <input
                                  type="text"
                                  value={item.videoThumbnailUrl || ''}
                                  onChange={(e) => {
                                    const updated = block.videoItems!.map((it, idx) =>
                                      idx === itemIdx ? { ...it, videoThumbnailUrl: e.target.value } : it
                                    );
                                    handleUpdateBlockData(block.id, { videoItems: updated });
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {block.buttonText !== undefined && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400">Texto do Botão</label>
                          <input
                            type="text"
                            value={block.buttonText || ''}
                            onChange={(e) => handleUpdateBlockData(block.id, { buttonText: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: THEMES */}
        {activeTab === 'themes' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              Selecione o Tema Visual
            </h3>

            <div className="space-y-3">
              {Object.values(THEMES).map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleProfileChange('theme', t.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    profile.theme === t.id
                      ? 'bg-sky-500/10 border-sky-400 ring-2 ring-sky-500/30'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Estilo exclusivo para seu perfil</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                      style={{ backgroundColor: t.accentColor }}
                    />
                    {profile.theme === t.id && (
                      <Check className="w-5 h-5 text-sky-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
