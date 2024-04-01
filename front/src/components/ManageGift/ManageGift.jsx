import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';
import { useParams, useNavigate } from 'react-router-dom';
import './ManageGift.css'; // Assurez-vous que le chemin d'accès est correct

const ManageGift = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState({
        name: '',
        description: '',
        currentPrice: 0,
        originalPrice: 0,
        reserved: false,
        giftListId: ''
    });

    useEffect(() => {
        const fetchGift = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/giftss/${id}`);
                setGift({
                    name: response.data.name,
                    description: response.data.description,
                    currentPrice: response.data.currentPrice,
                    originalPrice: response.data.originalPrice,
                    reserved: response.data.reserved,
                    // Assurez-vous d'extraire correctement l'ID de la liste de cadeaux si nécessaire
                    giftListId: response.data.giftListId
                });
            } catch (error) {
                console.error('Erreur lors de la récupération du cadeau:', error);
            }
        };

        fetchGift();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = value;

        if (type === 'number') {
            finalValue = value ? parseFloat(value) : 0; // Convertit en float, ou remet à 0 si vide
        } else if (type === 'checkbox') {
            finalValue = checked;
        }

        setGift((prevGift) => ({
            ...prevGift,
            [name]: finalValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/api/giftss/${id}`, gift, {
                headers: {
                    'Content-Type': 'application/ld+json',
                },
            });
            alert('Cadeau mis à jour avec succès!');
            navigate('/'); // Naviguez vers l'accueil ou une autre page souhaitée après la mise à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du cadeau:', error);
        }
    };

    return (
        <div className="manage-gift-container">
            <h2>Modifier le cadeau</h2>
            <form onSubmit={handleSubmit} className="manage-gift-form">
                <label>
                    Nom :
                    <input type="text" name="name" value={gift.name || ''} onChange={handleChange} />
                </label>
                <label>
                    Description :
                    <textarea name="description" value={gift.description || ''} onChange={handleChange}></textarea>
                </label>
                <label>
                    Prix Actuel :
                    <input type="number" name="currentPrice" value={gift.currentPrice || 0} onChange={handleChange} />
                </label>
                <label>
                    Prix Original :
                    <input type="number" name="originalPrice" value={gift.originalPrice || 0} onChange={handleChange} />
                </label>
                <label>
                    Réservé :
                    <input type="checkbox" name="reserved" checked={gift.reserved} onChange={handleChange} />
                </label>
                <label>
                    ID de la Liste de Cadeaux :
                    <input type="text" name="giftListId" value={gift.giftListId || ''} onChange={handleChange} />
                </label>
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default ManageGift;
