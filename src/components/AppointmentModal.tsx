import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle, Send, Stethoscope } from 'lucide-react';
import { ProfileData } from '../types';
import {
  APPOINTMENT_SERVICES,
  CONTACT,
  whatsappLink,
} from '../config/siteContent';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  preselectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  profile,
  preselectedService = 'Consulta Geral',
}) => {
  const [service, setService] = useState(preselectedService);
  const [insurance, setInsurance] = useState('Particular');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    const message = `Olá, ${profile.name}!\nGostaria de solicitar um agendamento:\n\n*Serviço:* ${service}\n*Modalidade:* ${insurance}\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Data Preferencial:* ${date || 'A combinar'}\n*Horário Preferencial:* ${time || 'A combinar'}`;

    const number = profile.socials.whatsapp?.replace(/\D/g, '') || CONTACT.whatsappNumber;
    const waUrl = whatsappLink(message, number);

    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSent(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-white">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-500/20 text-sky-400 rounded-2xl border border-sky-500/30">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Agendar Horário</h3>
              <p className="text-xs text-sky-400 font-medium">{profile.name} • {profile.crefito}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {sent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white">Redirecionando WhatsApp...</h4>
            <p className="text-sm text-slate-300">
              Estamos te conectando diretamente com a equipe do {profile.name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Tipo de Atendimento
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
              >
                {APPOINTMENT_SERVICES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Insurance / Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Modalidade de Pagamento
              </label>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Seu Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Maria Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            {/* Patient Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                WhatsApp para Contato
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="(47) 99938-3804"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Data Preferencial
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Horário
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar pelo WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
