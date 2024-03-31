<?php

namespace App\Repository;

use App\Entity\GiftLists;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GiftLists>
 *
 * @method GiftLists|null find($id, $lockMode = null, $lockVersion = null)
 * @method GiftLists|null findOneBy(array $criteria, array $orderBy = null)
 * @method GiftLists[]    findAll()
 * @method GiftLists[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GiftListsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GiftLists::class);
    }

    //    /**
    //     * @return GiftLists[] Returns an array of GiftLists objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('g.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?GiftLists
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
