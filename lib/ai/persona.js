const personas = new Map()

const DEFAULT_PERSONA = 'normal'

export const PERSONAS = {
  normal: {
    name: 'Normal',
    description: 'Amigável, natural, clara e equilibrada.'
  },

  profissional: {
    name: 'Profissional',
    description: 'Séria, objetiva e profissional.'
  },

  divertida: {
    name: 'Divertida',
    description: 'Descontraída, simpática e com humor leve.'
  },

  professor: {
    name: 'Professor',
    description: 'Didática, paciente e focada em explicar.'
  },

  vendas: {
    name: 'Vendas',
    description: 'Focada em negócios, vendas e World Library EYPT.'
  }
}

export function getPersona(jid) {
  return personas.get(jid) || DEFAULT_PERSONA
}

export function setPersona(jid, persona) {
  if (!PERSONAS[persona]) return false

  personas.set(jid, persona)

  return true
}

export function getPersonaInfo(jid) {
  const id = getPersona(jid)

  return {
    id,
    ...PERSONAS[id]
  }
}
