<?php

namespace App\Repository;

use App\Entity\Gifts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Gifts>
 *
 * @method Gifts|null find($id, $lockMode = null, $lockVersion = null)
 * @method Gifts|null findOneBy(array $criteria, array $orderBy = null)
 * @method Gifts[]    findAll()
 * @method Gifts[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GiftsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gifts::class);
    }

    //    /**
    //     * @return Gifts[] Returns an array of Gifts objects
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

    //    public function findOneBySomeField($value): ?Gifts
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
