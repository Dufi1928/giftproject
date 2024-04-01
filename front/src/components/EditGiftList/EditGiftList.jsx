import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';
import './EditGiftlist.css';
import axios from 'axios';

const EditGiftList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState({ title: '', description: ''});

    useEffect(() => {
        const fetchGift = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/gift_listss/${id}`);
                console.log(response.data);
                // Mettre à jour l'état avec les données récupérées, ou garder les valeurs initiales si non définies.
                setGift({
                    id: `/api/gift_listss/${response.data.id}`,
                    title: response.data.title || '',
                    creation_date: response.data.creation_date || '',
                    expirationDate: response.data.expirationDate || '',
                    description: response.data.description || '',
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du cadeau', error);
            }
        };

        fetchGift();
    }, [id]);

    const handleChange = (e) => {
        setGift({ ...gift, [e.target.title]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(gift)
            await axios.put(`${API_BASE_URL}/api/gift_listss/${id}`, gift, {
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            });
            alert('Cadeau mis à jour avec succès');
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du cadeau', error);
        }
    };

    return (
        <div className="edit-gifts-container">
            <h2>Éditer la liste</h2>
            <form onSubmit={handleSubmit} className="edit-gifts-form">
                <label>
                    <h3>Nom :</h3>
                    <input type="text" name="name" value={gift.title} onChange={handleChange}/>
                </label>
                <label>
                    <h3>Description :</h3>
                    <textarea name="description" value={gift.description} onChange={handleChange}/>
                </label>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default EditGiftList;
