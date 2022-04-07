
# 21cineplex-api

Scraping data dari 21cineplex untuk keperluan hobby dan riset, tidak ada hal yang berbahaya atau dapat merugikan website sumber.

## Software
```
- NodeJS^14.x.x (stable).
- npm^8.x.x
```

## Paket software
```
- cheerio^1.x.x
- axios^0.26.x
- express^4.17.x
- nodemon^2.0.x
```

## Installasi

```
- git clone https://github.com/heirro/21cineplex-api.git
- cd 21cineplex-api
- npm install
```

## Menjalankan projek

### Development
```
npm run dev
```

### Production
```
npm run start
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

#### Dapatkan item Teater berdasarkan Kota

```
- http://localhost:3180/cineplex/theaters/{city_id}
```

| Method | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `JSON` | Menampilkan semua item Teater (2D Reguler, IMAX, Premier) berdasarkan Kota, untuk mendapatkan id kota, menggunakan endpoint /cineplex/city |

#### Dapatkan item semua jadwal film di Teater berdasarkan Kota

```
- http://localhost:3180/cineplex/schedule/{teater_id}
```

| Method | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `JSON` | Menampilkan semua jadwal Film di Teater berdasarkan Kota, untuk mendapatkan id Teater, menggunakan endpoint /cineplex/city/{id} |


#### Dapatkan detail item Film

```
- http://localhost:3180/cineplex/movies/{movie_id}
```

| Method | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `JSON` | Menampilkan detail Film, untuk mendapatkan movie_id, menggunakan endpoint /cineplex/playing atau /cineplex/upcoming |



## Demo

- Now Playing: https://api.jadalak.com/cineplex/playing

- City: https://api.jadalak.com/cineplex/city

- Up Coming: https://api.jadalak.com/cineplex/upcoming

- Teater: https://api.jadalak.com/cineplex/city/12

- Schedule: https://api.jadalak.com/cineplex/schedule/SBYCIWO

- Movies: https://api.jadalak.com/cineplex/movies/20MORS