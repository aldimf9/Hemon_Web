import React, { useEffect, useState } from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Riwayat = () => {
  const [riwayatSeluruh, setRiwayatSeluruh] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  const handleSelectChange = (event) => {
    // Menyimpan nilai terpilih ke dalam state
    setSelectedCategory(event.target.value);
  };

  const handleSearch = async () => {
    // Logika pencarian atau tindakan lainnya yang ingin Anda lakukan ketika tombol "Search" ditekan
    try {
      const url = `http://localhost:3000/riwayat/${selectedCategory}`
      const responseC = await fetch(url);
      const dataC = await responseC.json();
      setRiwayatSeluruh(dataC);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/riwayat');
        const data = await response.json();
        setRiwayatSeluruh(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  
  }, []);

  return (
      <Container>
                <br/>
                <h4 >RIWAYAT ASESMENT SELURUH PENGGUNA</h4>
                <br/>
                <h6>Kategori Riwayat</h6>
                <Form className="d-flex">
                <Form.Select aria-label="Default select example" style={{ backgroundColor: 'white', color: 'black' }} onChange={handleSelectChange}>
                    <option >Pilih Kategori</option>
                    <option value="stroke">Stroke</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="jantung">Jantung</option>
                </Form.Select>
                <Button style={{ backgroundColor: 'white', color: 'black' }} type="submit" onClick={handleSearch}>Submit</Button>
                </Form>
                <br/>
            <Row xs={1} md={2} className="g-4" >
                {riwayatSeluruh.map((item) => (
                  <Col key={item.id} >
                    <Card style={{ width: '12rem' ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <Card.Body >
                            <Card.Text>
                                <strong>{item.jenisAsesmen}</strong>
                                <br/>
                                <strong>{item.hasilDiagnosis}</strong>
                                <br/>
                                <strong>{item.tanggalAsesmen}</strong>
                            </Card.Text>   
                        </Card.Body>
                    </Card>
                  </Col>
                ))}    
        </Row>
    </Container>
  );
};

export default Riwayat;
