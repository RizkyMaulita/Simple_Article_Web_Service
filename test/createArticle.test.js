const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { redis, patternKeyArticle } = require('../config/redis')
const data = {
  author: 'Intan Hamid',
  title: 'Aturan Pusat Larangan Mudik Jangan Dipukul Rata ke Daerah',
  body: 'Seorang dosen muda Universitas Muhammadiyah (Unismuh) Palu, Ari Fahry, Jumat (30/4), mengetik kebijakan pemerintah pusat mengenai aturan larangan mudik tahun ini.Di media sosial, Ari panggilan akrabnya termasuk getol menyuarakan kritikannya terhadap kebijakan larangan mudik tersebut. “Kebijakan larangan mudik adalah contoh gagalnya pemerintah dalam memandang Indonesia yang luas dari ujung Papua hingga Sumatera,”ujar Ari Fahry, Jumat (30/4). “Dikiranya Indonesia hanya Jakarta dan kota-kota besar di Jawa sana, yang pergerakan masyarakatnya sulit dikontrol karena banyaknya jumlah penduduk di sana,” ujarnya lagi. Ari berharap Pemerintah Daerah Provinsi Sulteng memiliki cara pandang dalam mengatur momen lebaran kali ini.Lebih lanjut ia berpendapat bila Pemda ingin mengatur pergerakan mudik, lebih baik yang harus diatur pergerakan provinsi. Dengan tetap memasifkan kampanye dan penerapan protokol kesehatan.“Plus, tutup tempat wisata. Kalau tempat wisata tetap buka dan mudik dilarang. Maka tempat-tempat wisata juga akan menjadi lokasi penumpukan orang,” kata Ari. Sedangkan Rafani Tuahuns, Ketua PB Pelajar Islam Indonesia (PII) menilai kebijakan larangan mudik sudah melarang hak masyarakat untuk berkumpul bersama keluarganya. Padahal bagi dia, itu perlu. “Tahun lalu kan kita sudah melalui masa larangan mudik dengan pengawasan cukup ketat. Tahun ini sebaiknya sudah boleh dilonggarkan. Hanya protokol kesehatannya saja yang perlu diperketat,” kata Rafani. Dia sendiri tahun ini terpaksa tidak ikut mudik ke Kabupaten Banggai, tidak seperti tahun lalu. Lantaran, harus menyelesaikan tugas-tugas barunya di Jakarta sebagai Ketua PB PII. “Sama satu hal. Jangan sampai bandara ditutup, tapi penerbangan komersil ke lokasi wisata dibuka. Saya pikir ini yang perlu diperhatikan,” kata Rafani.'
}

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

describe('Create Article POST /articles', () => {
  describe('Success Create New Article', () => {
    test('should response with message "Successfully create new article !" and data article', done => {
      request(app)
        .post('/articles')
        .send(data)
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(201)
          expect(body).toHaveProperty('message', 'Successfully create new article !')
          expect(body).toHaveProperty('data')
          done()
        })
    })
  })

  describe('Error Create because request body incomplete', () => {
    test(`response with message "Request body must be include 'author', 'title', and 'body' !"`, done => {
      request(app)
        .post('/articles')
        .send({
          author: null,
          title: data.title,
          body: null
        })
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', "Request body must be include 'author', 'title', and 'body' !")
          done()
        })
    })
  })
  
  describe('Error Create because Validation Error', () => {
    test('response with messages', done => {
      request(app)
        .post('/articles')
        .send({
          author: [],
          title: data.title,
          body: data.body
        })
        .end((err, res) => {
          const { body, status } = res
          if (err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', expect.anything())
          done()
        })
    })
  })
  
})
