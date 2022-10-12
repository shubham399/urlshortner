
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




## Demo

![](https://i.imgur.com/Kcmi1ER.png)

![](https://i.imgur.com/vndPmIA.png)



## Run Locally

Clone the project

```bash
  git clone https://github.com/shubham399/urlshortner.git
```

Go to the project directory

```bash
  cd urlshortner
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

