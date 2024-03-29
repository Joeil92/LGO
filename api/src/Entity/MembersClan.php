<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\MembersClanRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MembersClanRepository::class)]
#[ApiResource(
    paginationClientItemsPerPage: true,
    normalizationContext: ['groups' => ['membersClan:read']],
)]
#[ApiFilter(SearchFilter::class, properties: ['user' => 'exact'])]
class MembersClan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['clan:read', 'membersClan:read'])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'membersClan', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['clan:read', 'membersClan:read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'membersClans')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['clan:read', 'membersClan:read', 'user:read'])]
    private ?Clan $clan = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['clan:read', 'membersClan:read'])]
    private ?RankClan $rank_clan = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getClan(): ?Clan
    {
        return $this->clan;
    }

    public function setClan(?Clan $clan): self
    {
        $this->clan = $clan;

        return $this;
    }

    public function getRankClan(): ?RankClan
    {
        return $this->rank_clan;
    }

    public function setRankClan(?RankClan $rank_clan): self
    {
        $this->rank_clan = $rank_clan;

        return $this;
    }
}
