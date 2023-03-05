export interface Config {
  id: string;
  archivesForSearching: string[];
  timeCacheForDiscoveringSearchOverFilesInSeconds: number;
  timeCacheForPollingFromExternalResources: number;
  avoidFileNames: string[];
  extensionsForSearching: string[];
  outputFolderName: string;
  ecoreRequiredFilesFolder: string;
  rootPath: string;
  externalResources: string[];
  pathToConfigJson: string;
}
