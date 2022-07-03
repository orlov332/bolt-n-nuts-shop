# ProductsApi

All URIs are relative to *https://xmy3ijbcpj.execute-api.eu-west-1.amazonaws.com/dev*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addProduct**](ProductsApi.md#addProduct) | **POST** /products | Create new product |
| [**getProductById**](ProductsApi.md#getProductById) | **GET** /products/{productId} | Get product by Id |
| [**getProductsList**](ProductsApi.md#getProductsList) | **GET** /products | Get all product list |


<a name="addProduct"></a>
# **addProduct**
> List addProduct(Product)

Create new product

    Create new product

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Product** | [**List**](../Models/Product.md)|  | |

### Return type

[**List**](../Models/Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="getProductById"></a>
# **getProductById**
> Product getProductById(productId)

Get product by Id

    Get product by Id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productId** | **String**| The id of the product to retrieve | [default to null] |

### Return type

[**Product**](../Models/Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getProductsList"></a>
# **getProductsList**
> List getProductsList()

Get all product list

    Get all product list

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

