/**
 * routes that end with / must receive some parameter when called
 */

export const APP_ROUTES = {
  private: {
    agents: {
      name: '/agents',
      label: 'Agentes',
      subtitle: ''
    },
    projects: {
      name: '/projects',
      label: 'Projetos',
      subtitle: ''
    },
    dashboard: {
      name: '/projects/%/dashboard',
      label: 'Processos',
      subtitle: ''
    },
    'edit-process': {
      name: '/edit-process/',
      label: 'Processos',
      subtitle: 'Editar Processo'
    },
    'new-process': {
      name: '/new-process',
      label: 'Processos',
      subtitle: 'Novo Processo'
    },
    'edit-form': {
      name: '/projects/%/edit-form/',
      label: 'Formulários',
      subtitle: 'Editar Formulário'
    },
    'process-config': {
      name: '/process-config',
      label: 'Configurações',
      subtitle: 'Configure o Processo'
    },
    schedule: {
      name: '/schedule',
      label: 'Agenda',
      subtitle: ''
    }
  },
  public: {
    home: '/'
  }
};
