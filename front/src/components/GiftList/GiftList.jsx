import React, { useState, useEffect } from 'react';
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
            const response = await axios.get(`${API_BASE_URL}/api/gift_lists`);
            setGiftLists(response.data['hydra:member']);
        } catch (error) {
            console.error("Erreur lors de la récupération des listes de cadeaux:", error);
        }
    };

    const handleDeleteList = async (listId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/gift_lists/${listId}`);
            alert('Liste supprimée avec succès!');
            fetchGiftLists(); // Rafraîchit la liste des cadeaux après suppression
        } catch (error) {
            console.error('Erreur lors de la suppression de la liste:', error);
            alert('Erreur lors de la suppression de la liste.');
        }
    };

    return (
        <div>
            <h2>Listes de Cadeaux</h2>
            <Link to={'/admin'}>Ajouter une liste</Link>
            <ul>
                {giftLists.map((list) => (
                    <li key={list.id}>
                        <h3>{list.title}</h3>
                        <span>{list.id}</span>
                        <p>{list.description}</p>
                        <p>Date de création : {new Date(list.creation_date).toLocaleDateString()}</p>
                        {/* Bouton de suppression */}
                        <button onClick={() => handleDeleteList(list.id)}>Supprimer la liste</button>
                        <Link to={`/edit/${list.id}`}>Modifier</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiftLists;
