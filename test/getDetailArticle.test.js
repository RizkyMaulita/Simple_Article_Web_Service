const request = require('supertest')
const app = require('../app.js')
const { Article, sequelize } = require('../models')
const { queryInterface } = sequelize
const { redis, patternKeyArticle } = require('../config/redis')
const { getCurrentDate } = require('../helpers/index.js')

const data = [
  {
    author: 'Intan Hamid', 
    title: 'Aturan Pusat Larangan Mudik Jangan Dipukul Rata ke Daerah',
    body: 'Seorang dosen muda Universitas Muhammadiyah (Unismuh) Palu, Ari Fahry, Jumat (30/4), mengetik kebijakan pemerintah pusat mengenai aturan larangan mudik tahun ini.Di media sosial, Ari panggilan akrabnya termasuk getol menyuarakan kritikannya terhadap kebijakan larangan mudik tersebut. “Kebijakan larangan mudik adalah contoh gagalnya pemerintah dalam memandang Indonesia yang luas dari ujung Papua hingga Sumatera,”ujar Ari Fahry, Jumat (30/4). “Dikiranya Indonesia hanya Jakarta dan kota-kota besar di Jawa sana, yang pergerakan masyarakatnya sulit dikontrol karena banyaknya jumlah penduduk di sana,” ujarnya lagi. Ari berharap Pemerintah Daerah Provinsi Sulteng memiliki cara pandang dalam mengatur momen lebaran kali ini.Lebih lanjut ia berpendapat bila Pemda ingin mengatur pergerakan mudik, lebih baik yang harus diatur pergerakan provinsi. Dengan tetap memasifkan kampanye dan penerapan protokol kesehatan.“Plus, tutup tempat wisata. Kalau tempat wisata tetap buka dan mudik dilarang. Maka tempat-tempat wisata juga akan menjadi lokasi penumpukan orang,” kata Ari. Sedangkan Rafani Tuahuns, Ketua PB Pelajar Islam Indonesia (PII) menilai kebijakan larangan mudik sudah melarang hak masyarakat untuk berkumpul bersama keluarganya. Padahal bagi dia, itu perlu. “Tahun lalu kan kita sudah melalui masa larangan mudik dengan pengawasan cukup ketat. Tahun ini sebaiknya sudah boleh dilonggarkan. Hanya protokol kesehatannya saja yang perlu diperketat,” kata Rafani. Dia sendiri tahun ini terpaksa tidak ikut mudik ke Kabupaten Banggai, tidak seperti tahun lalu. Lantaran, harus menyelesaikan tugas-tugas barunya di Jakarta sebagai Ketua PB PII. “Sama satu hal. Jangan sampai bandara ditutup, tapi penerbangan komersil ke lokasi wisata dibuka. Saya pikir ini yang perlu diperhatikan,” kata Rafani.',
    created: getCurrentDate()
  },
  {
    author: 'Katondio B. Wedya',
    title: 'Breaking News: Inter Milan Resmi Juara Liga Italia 2020/21!',
    body: 'Inter Milan resmi mengunci status sebagai juara Liga Italia 2020/21. Hasil ini didapat berkat Atalanta bermain imbang dengan Sassuolo pada pekan ke-34, Minggu (2/5) malam WIB.Pertandingan berlangsung berat bagi Atalanta sejak awal laga di Mapei Stadium tersebut. La Dea harus kehilangan Pierluigi Gollini yang diganjar kartu merah pada menit 22. Walau begitu, Atalanta sempat unggul lebih dulu berkat gol Robin Gosens pada menit 32. Situasi berubah di babak kedua, Sassuolo bangkit via gol penalti Domenico Berardi pada menit 52. Skor 1-1 bertahan hingga bubar. Pada hari sebelumnya, Inter Milan mengunci kemenangan 2-0 atas tim juru kunci, Crotone. Hasil itu membuat Nerazzurri kini mengoleksi 82 poin dari 34 laga dan hasil imbang Atalanta memastikan scudetto Liga Italia 2020/21 jatuh ke tangan mereka. Usai satu dekade lamanya, Inter Milan akhirnya kembali merasakan gelar juara Liga Italia 2020/21. Terakhir kali, La Beneamata melakukannya pada musim 2009/10 ketika masih dibesut Jose Mourinho. Setelahnya, AC Milan berhasil sekali menjuarai Liga Italia. Kemudian, Juventus memulai kuasanya dengan menjadi juara 9 tahun beruntun. Uniknya, kejayaan Juventus kala itu diawali sejak era kepelatihan Antonio Conte. Kini, pelatih kelahiran Lecce itulah yang membawa Inter Milan merengkuh scudetto Liga Italia 2020/21. Akankah satu trofi juara yang dipersembahkan Conte ini menjadi awal dari dominasi Inter Milan di Liga Italia untuk satu dekade ke depan? Menarik dinantikan.',
    created: getCurrentDate() 
  }
]

beforeAll(async (done) => {
  try {
    const insertData = await Article.bulkCreate(data)
    if (insertData) {
      done()
    }
  } catch (err) {
    done(err)
  }
})

afterAll(async (done) => {
  try {
    const findKeyCaches = await redis.keys(`${patternKeyArticle}*`)
    if (findKeyCaches && findKeyCaches.length) {
      await Promise.all(findKeyCaches.map(key => redis.del(key)))
    }
    await queryInterface.bulkDelete('Articles')
    done()
  } catch (err) {
    done(err)
  }
})

describe('Get Detail Article GET /articles', () => {
  describe('Success get detail without query params', () => {
    test(`should response with data length ${data.length} `, (done) => {
      request(app)
        .get('/articles')
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(200)
          expect(body).toHaveLength(data.length)
          done()
        })
    })
  })
  describe('Success get detail with query params', () => {
    test(`should response with data length 1 `, (done) => {
      request(app)
        .get('/articles?query=mudik')
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(200)
          expect(body).toHaveLength(1)
          done()
        })
    })
  })
  describe('Error get detail with query params', () => {
    test(`should response with message "Data Not Found !"`, (done) => {
      request(app)
        .get('/articles?query=mudik?author=kumparan')
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'Data Not Found !')
          done()
        })
    })
  })
  describe('Error get detail because data empty', () => {
    test(`should response with message "Data Not Found !"`, async (done) => {
      const findKeyCaches = await redis.keys(`${patternKeyArticle}*`)
      if (findKeyCaches && findKeyCaches.length) {
        await Promise.all(findKeyCaches.map(key => redis.del(key)))
      }
      await queryInterface.bulkDelete('Articles')
      request(app)
        .get('/articles')
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'Data Not Found !')
          done()
        })
    })
  })
})
