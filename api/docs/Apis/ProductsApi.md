# ProductsApi

All URIs are relative to *http://https*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getProductById**](ProductsApi.md#getProductById) | **GET** /products/{productId} | Get product by Id |
| [**getProductsList**](ProductsApi.md#getProductsList) | **GET** /products | Get all product list |


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

