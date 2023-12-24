// Import required module for firebase purpose
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore,orderBy, Timestamp,collection, FieldValue, Filter ,query, where, getDocs} = require('firebase-admin/firestore');

// Web app's Firebase configuration
const serviceAccount = require('./hemon-d1c02-firebase-adminsdk-vx7eg-50859e4fba.json');
const firebaseConfig = {
  apiKey: "AIzaSyDKXaTVYdtgAanxo3ASkd6_-uBa6OHikOc",
  authDomain: "hemon-d1c02.firebaseapp.com",
  projectId: "hemon-d1c02",
  storageBucket: "hemon-d1c02.appspot.com",
  messagingSenderId: "477008040067",
  appId: "1:477008040067:web:021cc4b4670a31fc258bb6",
  credential: cert(serviceAccount)
};

// Initialize Firebase and Firestore
const fire = initializeApp(firebaseConfig);
const db = getFirestore(fire);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/riwayat', async (req, res) => {
  try {
    const riwayatSeluruh = [];
    const asesmenRef = db.collection('asesmen');
    const snapshot = await asesmenRef.orderBy('tanggalAsesmen', 'desc').get();
    snapshot.forEach(doc => {
      const data = doc.data();
      const tempDate = data.tanggalAsesmen.toDate().toLocaleDateString('id-ID');
      const tempTime = data.tanggalAsesmen.toDate().toLocaleTimeString('id-ID');
      data.tanggalAsesmen = tempDate + " " + tempTime;
      data.tanggalAsesmen = data.tanggalAsesmen.replaceAll(".", ":");
      riwayatSeluruh.push(data);
    });
   
    console.log(riwayatSeluruh);
    res.json(riwayatSeluruh);
  } catch (error) {
    console.error('Error fetching riwayat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/riwayat/jantung',async(req,res)=>{
  try{
    const riwayatJantung = [];
    const asesmenJantung = db.collection('asesmen');
    const snapshotJantung  = await asesmenJantung.where('jenisAsesmen', '==', 'jantung').get();
    snapshotJantung.forEach(doc => {
      const dataJantung  = doc.data();
      const tempDateJantung  = dataJantung .tanggalAsesmen.toDate().toLocaleDateString('id-ID');
      const tempTimeJantung  = dataJantung .tanggalAsesmen.toDate().toLocaleTimeString('id-ID');
      dataJantung.tanggalAsesmen = tempDateJantung  + " " + tempTimeJantung ;
      dataJantung.tanggalAsesmen = dataJantung .tanggalAsesmen.replaceAll(".", ":");
      riwayatJantung.push(dataJantung);
    });
    res.json(riwayatJantung);
  }catch(error){
    console.error('Error fetching riwayat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.get('/riwayat/stroke',async(req,res)=>{
  try{
    const riwayatStroke = [];
    const asesmenStroke = db.collection('asesmen')
    const snapshotStroke = await asesmenStroke.where('jenisAsesmen','==','stroke').get();
    snapshotStroke.forEach(doc => {
      const dataStroke = doc.data();
      const tempDateStroke = dataStroke.tanggalAsesmen.toDate().toLocaleDateString('id-ID');
      const tempTimeStroke = dataStroke.tanggalAsesmen.toDate().toLocaleTimeString('id-ID');
      dataStroke.tanggalAsesmen = tempDateStroke + " " + tempTimeStroke;
      dataStroke.tanggalAsesmen = dataStroke.tanggalAsesmen.replaceAll(".", ":");
      riwayatStroke.push(dataStroke);
    });
    res.json(riwayatStroke);
  }catch(error){
    console.error('Error fetching riwayat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.get('/riwayat/diabetes',async(req,res)=>{
  try{
    const riwayatDiabetes = [];
    const asesmenDiabetes = db.collection('asesmen')
    const snapshotDiabetes = await asesmenDiabetes.where('jenisAsesmen','==','diabetes').get();
    snapshotDiabetes.forEach(doc => {
      const dataDiabetes = doc.data();
      const tempDateDiabetes = dataDiabetes.tanggalAsesmen.toDate().toLocaleDateString('id-ID');
      const tempTimeDiabetes = dataDiabetes.tanggalAsesmen.toDate().toLocaleTimeString('id-ID');
      dataDiabetes.tanggalAsesmen = tempDateDiabetes+ " " + tempTimeDiabetes;
      dataDiabetes.tanggalAsesmen = dataDiabetes.tanggalAsesmen.replaceAll(".", ":");
      riwayatDiabetes.push(dataDiabetes);
    });
    res.json(riwayatDiabetes);
  }catch(error){
    console.error('Error fetching riwayat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});