<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Put(),
        new Post(),
        new Delete(),
        new Post(),
    ]
)]
#[ORM\Table(name: '`user`')]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Username = null;

    #[ORM\OneToMany(targetEntity: GiftLists::class, mappedBy: 'UserId')]
    private Collection $giftLists;

    public function __construct()
    {
        $this->giftLists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->Username;
    }

    public function setUsername(string $Username): static
    {
        $this->Username = $Username;

        return $this;
    }

    /**
     * @return Collection<int, GiftLists>
     */
    public function getGiftLists(): Collection
    {
        return $this->giftLists;
    }

    public function addGiftList(GiftLists $giftList): static
    {
        if (!$this->giftLists->contains($giftList)) {
            $this->giftLists->add($giftList);
            $giftList->setUserId($this);
        }

        return $this;
    }

    public function removeGiftList(GiftLists $giftList): static
    {
        if ($this->giftLists->removeElement($giftList)) {
            // set the owning side to null (unless already changed)
            if ($giftList->getUserId() === $this) {
                $giftList->setUserId(null);
            }
        }

        return $this;
    }
}
