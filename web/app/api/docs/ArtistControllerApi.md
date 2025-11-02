# ArtistControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createArtist**](#createartist) | **POST** /api/artists | |
|[**deleteArtist**](#deleteartist) | **DELETE** /api/artists/{id} | |
|[**getAllArtists**](#getallartists) | **GET** /api/artists | |
|[**getArtistById**](#getartistbyid) | **GET** /api/artists/{id} | |
|[**getArtistConcerts**](#getartistconcerts) | **GET** /api/artists/{id}/concerts | |
|[**searchArtists**](#searchartists) | **GET** /api/artists/search | |
|[**updateArtist**](#updateartist) | **PUT** /api/artists/{id} | |

# **createArtist**
> createArtist(artistRequest)


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration,
    ArtistRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let artistRequest: ArtistRequest; //

const { status, data } = await apiInstance.createArtist(
    artistRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **artistRequest** | **ArtistRequest**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteArtist**
> deleteArtist()


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteArtist(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllArtists**
> Array<ArtistResponse> getAllArtists()


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let search: string; // (optional) (default to undefined)
let page: number; // (optional) (default to 0)
let pageSize: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getAllArtists(
    search,
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **search** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **pageSize** | [**number**] |  | (optional) defaults to 10|


### Return type

**Array<ArtistResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getArtistById**
> ArtistResponse getArtistById()


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getArtistById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ArtistResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getArtistConcerts**
> Array<ConcertResponse> getArtistConcerts()


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getArtistConcerts(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Array<ConcertResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchArtists**
> Array<ArtistResponse> searchArtists()


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let query: string; // (default to undefined)

const { status, data } = await apiInstance.searchArtists(
    query
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] |  | defaults to undefined|


### Return type

**Array<ArtistResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateArtist**
> updateArtist(artistRequest)


### Example

```typescript
import {
    ArtistControllerApi,
    Configuration,
    ArtistRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ArtistControllerApi(configuration);

let id: number; // (default to undefined)
let artistRequest: ArtistRequest; //

const { status, data } = await apiInstance.updateArtist(
    id,
    artistRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **artistRequest** | **ArtistRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

