# Terminologie der B20

> Fill text

## Connecting Elasticsearch to Google Sheet

Using add-on [Spreadsheet To Elasticsearch](https://chrome.google.com/webstore/detail/spreadsheet-to-elasticsea/amnfaibojgjamaemnngbojibaacmndjo)

Connection details:

* Host: hostname.bonsaisearch.net (example: acme-development-8779249584.eu-central-1.bonsaisearch.net )
* Port: 443
* Use SSL?: Yes
* Username: **access key** found in the access tab in the bonsai dashboard
* Password: **secret key** found in the access tab in the bonsai dashboard

## Creating Index

1. Create index

In Kibana dashboard, type `PUT termbank`

2. Set mappings

```JSON
PUT termbank/_mapping/fiche
{
  "properties": {
    "german": {
      "type": "text",
      "fields": {
        "auto": {
          "type": "completion",
          "analyzer": "simple",
          "search_analyzer": "simple"
        }
      }
    },
    "french": {
      "type": "text",
      "fields": {
        "auto": {
          "type": "completion",
          "analyzer": "simple",
          "search_analyzer": "simple"
        }
      }
    }
  }
}
```

## Build Setup (client)

```bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build
```

## Build Setup (Server)

```bash
# install dependencies
npm install

# serve with nodemon at localhost:8081
npm start
```

## Resources used

Project structure from [freeCodeCamp tutorial on YouTube](https://www.youtube.com/playlist?list=PLWKjhJtqVAbnadueQ-C5keMQQiQau_i0D)

Idea based of blog post [Leveraging the Power of Elasticsearch: Autocomplete and Fuzzy Search](https://blog.manifold.co/leveraging-the-power-of-elasticsearch-autocomplete-and-fuzzy-search-1d491d3e0b38)

[Building an Autocomplete Component with Vue.js](https://alligator.io/vuejs/vue-autocomplete-component/)

## References from Elasticsearch docs

[Completion Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html#search-suggesters-completion)

[Index the same field but with different types](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html)
