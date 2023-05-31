const express = require('express');
const app = express();

app.use(express.json()); //untuk parsing req body format JSON

const port = 8080;

let emails = [
  {
    id: '1',
    nama: 'andi',
    email: 'andi@gmail.com',
  },
  {
    id: '2',
    nama: 'budi',
    email: 'budi@gmail.com',
  },
  {
    id: '3',
    nama: 'cici',
    email: 'cici@gmail.com',
  },
];

// GET - Read emails' list
app.get('/email', (req, res) => {
  res.send({
    success: true,
    message: 'data is fetched successfully.',
    data: emails,
  });
});

// POST - Create a new email
app.post('/email', (req, res) => {
  let nama = req.body.nama;
  if (nama) {
    emails.push({
      id: (emails.length + 1).toString(),
      nama: nama,
      email: `${nama}@gmail.com`,
    });
    res.send({
      success: true,
      message: 'data is added successfully.',
    });
  } else {
    res.send({
      success: false,
      message: 'validation error',
      errors: [
        {
          field: 'nama',
          message: 'nama is required!',
        },
      ],
    });
  }
});

// DELETE - Delete a email
app.delete('/email/:id', (req, res) => {
  const id = req.params.id;
  const remainEmail = emails.filter((el) => el.id !== id);

  //   untuk reset ID ke urutan yang benar setiap delete
  remainEmail.forEach((el, index) => (el.id = (index + 1).toString()));
  emails = [...remainEmail];
  res.send({
    success: true,
    message: 'data is deleted successfully',
    data: remainEmail,
  });
});

// PUT - Edit nama
app.put('/email/:id', (req, res) => {
  const id = req.params.id;
  const nama = req.body.nama;

  if (nama) {
    let index = emails.findIndex((el) => el.id === id);

    emails[index] = {
      ...emails[index],
      nama: nama,
      email: `${nama}@gmail.com`,
    };

    res.send({
      success: true,
      message: 'data is updated successfully',
      data: emails[index],
    });
  } else {
    res.send({
      success: false,
      message: 'validation error',
      errors: [
        {
          field: 'nama',
          message: 'nama is required!',
        },
      ],
    });
  }
});

app.listen(port, () => {
  console.log(`server is running on: http://localhost:${port}`);
});
