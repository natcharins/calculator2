const dynamicConfigList = ["localhost", "127.0.0.1"]; // Ignoring setting restUrl from the config-file.

export default function generateConstant(appConfig: any) {
    // Dynamic config setting for local, dev and qa env

    if (dynamicConfigList.filter((value: string) => { return window.location.origin.indexOf(value) > -1; }).length) {
        appConfig.restUrl = window.location.origin;
    }

    appConfig.env = process.env.NODE_ENV || "local";

    return appConfig;
};
