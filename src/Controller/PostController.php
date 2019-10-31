<?php

namespace App\Controller;

use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * @Rest\Route("/api")
 */
class PostController extends AbstractController
{
    private $em;
    private $serializer;

    public function __construct(EntityManagerInterface $em, SerializerInterface $serializer)
    {
      $this->em = $em;
      $this->serializer = $serializer;
    }


  /**
     * @Rest\Get("/posts")
     */
    public function findAllPosts()
    {
        $posts = $this->em->getRepository(Post::class)->findAll();
        $data = $this->serializer->serialize($posts,JsonEncoder::FORMAT);
        return new JsonResponse($data,Response::HTTP_OK,[],true);
    }

    /**
     * @Rest\Get("/post/{id}", requirements={ "id" = "[0-9]+" })
     */
    public function findPost($id) {
      $post = $this->em->getRepository(Post::class)->find($id);
      $data = $this->serializer->serialize($post,JsonEncoder::FORMAT);
      return new JsonResponse($data,Response::HTTP_OK,[],true);
    }

    /**
     * @Rest\Delete("/post/{id}", requirements={ "id" = "[0-9]+" })
     */
    public function deletePost(Request $request,$id) {

      $post = $this->em->getRepository(Post::class)->find($id);
      $this->em->remove($post);
      $this->em->flush();
      $posts = $this->em->getRepository(Post::class)->findAll();
      $data = $this->serializer->serialize($posts,JsonEncoder::FORMAT);
      return new JsonResponse($data,Response::HTTP_OK,[],true);

    }
}
