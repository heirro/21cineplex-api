
# 21cineplex-api

Scraping data dari 21cineplex untuk keperluan hobby dan riset, tidak ada hal yang berbahaya atau dapat merugikan website sumber.

## Software
```
- NodeJS v14.19.0 atau lebih dengan versi stabil.
- npm v8.1.3 atau lebih
```

## Paket software
```
- cheerio^1.0.0-rc.10
- axios^0.26.1
- express^4.17.3
- nodemon^2.0.15
```

## Installasi

```
- git clone https://github.com/heirro/21cineplex-api.git
- cd 21cineplex-api
- npm install
```

## Menjalankan projek

### Via NPM
```
npm run start
```

### Via Bash Script
```
sh run.sh
```
## Referensi API

#### Dapatkan item film yang sedang berlangsung

```
http://localhost:3180/cineplex/playing
```

| Method | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `JSON` | Menampilkan semua Film yang sedang berlangsung di theater. |

#### Dapatkan item film yang akan datang

```
http://localhost:3180/cineplex/upcoming
```

| Method | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `JSON` | Menampilkan semua Film yang akan datang di theater. |

#### Dapatkan item semua Kota

```
http://localhost:3180/cineplex/city
```

| Method | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `JSON` | Menampilkan semua Kota |