import Conf from 'conf';

export interface AuthData {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ConfigData {
  projectId?: string;
  framework?: string;
  providers?: string[];
}

const authConf = new Conf<any>({
  projectName: 'shipkit',
  configName: 'auth',
});

const projectConf = new Conf<any>({
  projectName: 'shipkit',
  configName: 'config',
});

export const getAuth = (): AuthData | undefined => {
  return authConf.get('auth') as AuthData | undefined;
};

export const setAuth = (auth: AuthData) => {
  authConf.set('auth', auth);
};

export const clearAuth = () => {
  authConf.delete('auth');
};

export const getProjectConfig = (): ConfigData => {
  return (projectConf.get('project') || {}) as ConfigData;
};

export const setProjectConfig = (config: ConfigData) => {
  projectConf.set('project', config);
};

export const clearProjectConfig = () => {
  projectConf.delete('project');
};
