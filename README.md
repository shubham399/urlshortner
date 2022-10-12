
# Urlshortner

Is an URL Shortner running on `s.f3v3r.in`




## Authors

- [@shubham399](https://www.github.com/shubham399)


## API Reference

#### Get Page

```http
  GET /
```

#### Redirect to URL 

```http
 GET /:slug:
```
This will redirect to the URL used when creating the slug


#### Create a Entry 
```http
  POST /url
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Required**. Url to be shorten |

