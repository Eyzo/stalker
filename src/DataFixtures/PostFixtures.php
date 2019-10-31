<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class PostFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);

      $faker = \Faker\Factory::create('fr_FR');

      for ($i = 0;$i < 10;$i++) {
        $post = new Post();
        $post->setName($faker->name);
        $post->setSlug($faker->slug);
        $post->setDescription($faker->paragraph());
        $post->setCreatedAt(new \DateTime('NOW'));
        $post->setImg($faker->imageUrl());
        $manager->persist($post);
      }

        $manager->flush();
    }
}
