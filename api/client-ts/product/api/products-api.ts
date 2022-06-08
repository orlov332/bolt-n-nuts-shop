/* tslint:disable */
/* eslint-disable */
/**
 * Product catalog API
 * This is a simple \'Product catalog\' service for e-shops
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../base';
// @ts-ignore
import { Product } from '../../product/model';
/**
 * ProductsApi - axios parameter creator
 * @export
 */
export const ProductsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get all product list
         * @summary Get all product list
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProductsList: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/products`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ProductsApi - functional programming interface
 * @export
 */
export const ProductsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ProductsApiAxiosParamCreator(configuration)
    return {
        /**
         * Get all product list
         * @summary Get all product list
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getProductsList(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Product>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getProductsList(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ProductsApi - factory interface
 * @export
 */
export const ProductsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProductsApiFp(configuration)
    return {
        /**
         * Get all product list
         * @summary Get all product list
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProductsList(options?: any): AxiosPromise<Product> {
            return localVarFp.getProductsList(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProductsApi - interface
 * @export
 * @interface ProductsApi
 */
export interface ProductsApiInterface {
    /**
     * Get all product list
     * @summary Get all product list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApiInterface
     */
    getProductsList(options?: AxiosRequestConfig): AxiosPromise<Product>;

}

/**
 * ProductsApi - object-oriented interface
 * @export
 * @class ProductsApi
 * @extends {BaseAPI}
 */
export class ProductsApi extends BaseAPI implements ProductsApiInterface {
    /**
     * Get all product list
     * @summary Get all product list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApi
     */
    public getProductsList(options?: AxiosRequestConfig) {
        return ProductsApiFp(this.configuration).getProductsList(options).then((request) => request(this.axios, this.basePath));
    }
}
