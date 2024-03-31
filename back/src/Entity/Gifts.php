<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\GiftsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GiftsRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Put(),
        new Post(),
        new Delete(),
        new Post(),
    ]
)]
class Gifts
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column]
    private ?float $current_price = null;

    #[ORM\Column]
    private ?float $original_price = null;

    #[ORM\Column]
    private ?bool $reserved = null;

    #[ORM\ManyToOne(inversedBy: 'gifts')]
    private ?GiftLists $giftListId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCurrentPrice(): ?float
    {
        return $this->current_price;
    }

    public function setCurrentPrice(float $current_price): static
    {
        $this->current_price = $current_price;

        return $this;
    }

    public function getOriginalPrice(): ?float
    {
        return $this->original_price;
    }

    public function setOriginalPrice(float $original_price): static
    {
        $this->original_price = $original_price;

        return $this;
    }

    public function isReserved(): ?bool
    {
        return $this->reserved;
    }

    public function setReserved(bool $reserved): static
    {
        $this->reserved = $reserved;

        return $this;
    }

    public function getGiftListId(): ?GiftLists
    {
        return $this->giftListId;
    }

    public function setGiftListId(?GiftLists $giftListId): static
    {
        $this->giftListId = $giftListId;

        return $this;
    }
}
