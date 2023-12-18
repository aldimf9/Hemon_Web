// Import required module for firebase purpose
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


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
initializeApp(firebaseConfig);
const db = getFirestore();


const riwayatSeluruh = []; // Array yang akan menyimpan seluruh riwayat asesmen pasien
async function getRiwayat(){
    // mengambil data riwayat asesmen seluruh pasien dari firebase
    // data terurut berdasarkan asesmen terbaru
    
    const snapshot = await db.collection("asesmen").orderBy("tanggalAsesmen", "desc").get();
    snapshot.forEach(doc => {
        
        data = doc.data();
        const tempDate = data.tanggalAsesmen.toDate().toLocaleDateString('id-ID');
        const tempTime = data.tanggalAsesmen.toDate().toLocaleTimeString('id-ID');
        data.tanggalAsesmen = tempDate + " " + tempTime;
        data.tanggalAsesmen = data.tanggalAsesmen.replaceAll(".", ":");
        riwayatSeluruh.push(data);
      });
    

    console.log(riwayatSeluruh);
    
    return riwayatSeluruh;

}

getRiwayat();