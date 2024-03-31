// src/components/Gifts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gifts = () => {
    const [gifts, setGifts] = useState([]);
    const [selectedGifts, setSelectedGifts] = useState([]);
    const [listTitle, setListTitle] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [expirationDate, setExpirationDate] = useState('');


    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/gifts');
                setGifts(response.data['hydra:member']);
            } catch (error) {
                console.error('Erreur lors de la récupération des cadeaux:', error);
            }
        };

        fetchGifts();
    }, []);

    const toggleGiftSelection = (id) => {
        setSelectedGifts((prevSelectedGifts) =>
            prevSelectedGifts.includes(id)
                ? prevSelectedGifts.filter((giftId) => giftId !== id)
                : [...prevSelectedGifts, id]
        );
    };

    const handleCreateList = async () => {
        // Préparation de la payload pour la requête POST
        const currentDate = new Date().toISOString();

        const payload = {
            title: listTitle,
            description: listDescription,
            gifts: selectedGifts.map(id => `api/gifts/${id}`),
            creation_date: currentDate,
            expirationDate: expirationDate,
        };

        console.log(payload)
        try {
            await axios.post('http://localhost:8000/api/gift_lists', payload, {
                headers: {
                    'Content-Type': 'application/ld+json',
                },
            });
            alert('Liste créée avec succès!');
            // Réinitialiser les champs et la sélection
            setListTitle('');
            setListDescription('');
            setSelectedGifts([]);
        } catch (error) {
            console.error('Erreur lors de la création de la liste:', error);
        }
    };


    return (
        <div>
            <h2>Créer ta liste</h2>
            <input
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                placeholder="Nom de ta liste"
            />
            <textarea
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}
                cols="30"
                rows="10"
                placeholder="Description"
            ></textarea>
            <ul>
                {gifts.map((gift) => (
                    <li key={gift.id}>
                        <input
                            type="checkbox"
                            checked={selectedGifts.includes(gift.id)}
                            onChange={() => toggleGiftSelection(gift.id)}
                        />
                        <h3>{gift.name}</h3>
                        <p>originalPrice {gift.originalPrice} €</p>
                        <p>currentPrice {gift.currentPrice} €</p>
                    </li>
                ))}
            </ul>
            <label htmlFor="expiration-date">Date d'expiration:</label>
            <input
                type="date"
                id="expiration-date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
            />
            <button onClick={handleCreateList}>Créer</button>
        </div>
    );
};

export default Gifts;
