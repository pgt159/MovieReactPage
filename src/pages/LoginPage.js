import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
const LoginPage = () => {
    const docRef = collection(db, 'users');
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'userName':
                setUserName(value)
                break;
            case 'password':
                setPassword(value)
                break;
        
            default:
                break;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        addDoc(docRef, {
            userName, password
        }).then(res => console.log('success'));
        const user = await createUserWithEmailAndPassword(auth,userName, password);
        console.log(user)
        
    }
    const handleDelete = () => {
        const deleteRef = doc(db,'users','uHCw0DioLqTSmR7m8CBv')
        deleteDoc(deleteRef).then(res => console.log('okay'));
    }
    const array = []
    useEffect(() => {
        getDocs(docRef).then(snapshot => {
            console.log(snapshot.docs)
            snapshot.docs.forEach((doc) => {
                array.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        })
    },[])
    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input type="text" placeholder='enter your name' onChange={(e) => handleInputChange('userName',e.target.value)} />
                <input type="text" placeholder='enter your password' onChange={(e) => handleInputChange('password',e.target.value)} />
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default LoginPage;