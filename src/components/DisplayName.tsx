import React from 'react';
import { PROFILE } from '../config/siteContent';

/**
 * Mostra o nome do profissional, quebrando o trecho final
 * (PROFILE.nameSecondLine) para uma segunda linha quando ele estiver presente.
 * O markup é o mesmo usado nos dois cabeçalhos (home e "Sobre").
 */
export const DisplayName: React.FC<{ name: string }> = ({ name }) => {
  const tail = PROFILE.nameSecondLine.trim();

  if (tail && name.endsWith(tail) && name.length > tail.length) {
    return (
      <>
        {name.slice(0, -tail.length).trim()}
        <br />
        {tail}
      </>
    );
  }

  return <>{name}</>;
};
