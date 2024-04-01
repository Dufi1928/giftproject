// src/components/EditGifts/EditGifts.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditGifts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState({ name: '', description: ''});

    useEffect(() => {
        // Ici, nous récupérons les données du cadeau à éditer.
        const fetchGift = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/gift_lists/${id}`);
                setGift(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du cadeau', error);
            }
        };

        fetchGift();
    }, [id]);

    const handleChange = (e) => {
        setGift({ ...gift, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/gift_lists/${id}`, gift);
            alert('Cadeau mis à jour avec succès');
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du cadeau', error);
        }
    };

    return (
        <div>
            <h2>Éditer la liste</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom :
                    <input type="text" name="name" value={gift.title} onChange={handleChange} />
                </label>
                <label>
                    Description :
                    <textarea name="description" value={gift.description} onChange={handleChange} />
                </label>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default EditGifts;
