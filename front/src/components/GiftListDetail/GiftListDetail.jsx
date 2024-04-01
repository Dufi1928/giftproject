import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './GiftListDetail.css'; // Assurez-vous que le chemin d'accès est correct

const GiftListDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [giftListDetails, setGiftListDetails] = useState(null);
    const [gifts, setGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchGiftListDetails = async () => {
            setIsLoading(true); // Commence le chargement
            try {
                const response = await axios.get(`https://127.0.0.1:8000/api/gift_listss/${id}`);
                setGiftListDetails(response.data);
                await fetchGifts(response.data.gifts);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la liste de cadeaux:', error);
            } finally {
                setIsLoading(false); // Termine le chargement
            }
        };

        const fetchGifts = async (giftUrls) => {
            try {
                const giftsResponses = await Promise.all(
                    giftUrls.map((giftUrl) =>
                        axios.get(`https://127.0.0.1:8000${giftUrl}`)
                    )
                );
                setGifts(giftsResponses.map((response) => response.data));
            } catch (error) {
                console.error('Erreur lors de la récupération des cadeaux:', error);
            }
        };

        fetchGiftListDetails();
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <p>Chargement des détails...</p> // Remplacez ceci par un composant de chargement si vous en avez un
            ) : (
                <>
                    <h2>Détails de la liste de cadeaux: {giftListDetails?.title}</h2>
                    <p>{giftListDetails?.description}</p>
                    <ul>
                        {gifts.map((gift) => (
                            <li key={gift.id} className="gift-item">
                                <h3>{gift.name}</h3>
                                <p>Description: {gift.description}</p>
                                <p>Prix actuel: {gift.currentPrice} €</p>
                                <p>Prix original: {gift.originalPrice} €</p>
                                <button onClick={() => navigate(`/edit-gift/${gift.id}`)} className="edit-button">Modifier</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );

};

export default GiftListDetail;
