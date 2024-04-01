import React, { useState, useEffect } from 'react';
import './GiftLists.css';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';
import {Link} from "react-router-dom"; // Assure-toi que le chemin est correct

const GiftLists = () => {
    const [giftLists, setGiftLists] = useState([]);

    useEffect(() => {
        fetchGiftLists();
    }, []);

    const fetchGiftLists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/gift_listss`);
            setGiftLists(response.data['hydra:member']);
        } catch (error) {
            console.error("Erreur lors de la récupération des listes de cadeaux:", error);
        }
    };

    const handleDeleteList = async (listId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/gift_listss/${listId}`);
            alert('Liste supprimée avec succès!');
            fetchGiftLists(); // Rafraîchit la liste des cadeaux après suppression
        } catch (error) {
            console.error('Erreur lors de la suppression de la liste:', error);
            alert('Erreur lors de la suppression de la liste.');
        }
    };

    return (
        <div className="gift-lists-container">
            <div className="gift-lists-header">
                <h2>Listes de Cadeaux</h2>
                <Link to={'/admin'} className="add-list-link">Ajouter une liste</Link>
            </div>
            <ul className="gift-list">
                {giftLists.map((list) => (
                    <li key={list.id} className="gift-list-item">
                        <h3>{list.title}</h3>
                        <span>{list.id}</span>
                        <p>{list.description}</p>
                        <p>Date de création : {new Date(list.creation_date).toLocaleDateString()}</p>
                        <button onClick={() => handleDeleteList(list.id)} className="button-delete">Supprimer la liste</button>
                        <Link to={`/edit/${list.id}`} className="button-edit">Modifier</Link>
                        <Link to={`/edit/gift/${list.id}`} className="button-edit">Voir</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiftLists;
