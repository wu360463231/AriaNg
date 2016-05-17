(function () {
    'use strict';

    angular.module('ariaNg').factory('ariaNgSettingService', ['$location', '$translate', 'amMoment', 'localStorageService', 'ariaNgConstants', 'ariaNgDefaultOptions', function ($location, $translate, amMoment, localStorageService, ariaNgConstants, ariaNgDefaultOptions) {
        var getDefaultRpcHost = function () {
            return $location.$$host;
        };

        var setOptions = function (options) {
            return localStorageService.set(ariaNgConstants.optionStorageKey, options);
        };

        var getOptions = function () {
            var options = localStorageService.get(ariaNgConstants.optionStorageKey);

            if (!options) {
                options = angular.extend({}, ariaNgDefaultOptions);
                setOptions(options);
            }

            return options;
        };

        var getOption = function (key) {
            var options = getOptions();

            if (angular.isUndefined(options[key])) {
                options[key] = ariaNgDefaultOptions[key];
                setOptions(options);
            }

            return options[key];
        };

        var setOption = function (key, value) {
            var options = getOptions();
            options[key] = value;

            setOptions(options);
        };

        return {
            getAllOptions: function () {
                var options = angular.extend({}, ariaNgDefaultOptions, getOptions());

                if (!options.rpcHost) {
                    options.rpcHost = getDefaultRpcHost();
                }

                return options;
            },
            setAllOptions: function (options) {
                setOptions(options);
            },
            getLanguage: function () {
                return getOption('language');
            },
            setLanguage: function (value) {
                setOption('language', value);
                $translate.use(value);
                amMoment.changeLocale(value);
            },
            getJsonRpcUrl: function () {
                var protocol = getOption('protocol');
                var rpcHost = getOption('rpcHost');
                var rpcPort = getOption('rpcPort');

                if (!rpcHost) {
                    rpcHost = getDefaultRpcHost();
                }

                return protocol + '://' + rpcHost + ':' + rpcPort + '/jsonrpc';
            },
            setRpcHost: function (value) {
                setOption('rpcHost', value);
            },
            setRpcPort: function (value) {
                setOption('rpcPort', value);
            },
            getProtocol: function () {
                return getOption('protocol');
            },
            setProtocol: function (value) {
                setOption('protocol', value);
            },
            getGlobalStatRefreshInterval: function () {
                return getOption('globalStatRefreshInterval');
            },
            getDownloadTaskRefreshInterval: function () {
                return getOption('downloadTaskRefreshInterval');
            },
            getDisplayOrder: function () {
                var value = getOption('displayOrder');

                if (!value) {
                    value = 'default';
                }

                return value;
            },
            setDisplayOrder: function (value) {
                setOption('displayOrder', value);
            }
        };
    }]);
})();