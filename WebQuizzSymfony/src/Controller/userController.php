<?php
namespace App\Controller;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;


class userController extends AbstractController {

    // this method will return all users
    /**
     * @Route("/getUsers", name="get_users")
     */
    public function getAllUsers(ManagerRegistry $doctrine) {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        // database query
        $questions = $doctrine->getRepository(User::class)->findAll();

        // eception
        if (!$questions) {
            throw $this->createNotFoundException(
                'No Users found '
            );
        }

        // serializing datas
        $json = $serializer->serialize($questions, 'json');
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    // this method will add a new user to the db
    /**
     * @Route("/users/add/", name="add_user")
     */
    public function addUser(ManagerRegistry $doc, Request $request)
    {

        // get the json content of th epost request
        $content = json_decode($request->getContent(), true);
        $updates = $content['updates'];
        $paramUsers = $updates[0];
        $paramPass = $updates[1];
        
        $users = $paramUsers['value'];
        $pass = $paramPass['value'];
       
        // database request
       $user = $doc->getRepository(User::class);

        // create the new User
        $user = new User();
        $user->setEmail($users);
        $user->setPassword($pass);
        // persist
        $dc = $doc->getManager();

        // pushs
        $dc->persist($user);
        $dc->flush();

        // post response datas
        $reponse = new Response();
        $reponse->setContent(json_encode([
            'email' => $users,
            'password' => $pass,     
        ]));
        
        return $reponse;
    }

    // this methods is currently useless
    /**
     * @Route("/users/points/{points}", name="update_points")
     */
    public function updatePoints(int $points, ManagerRegistry $doc, Request $request)
    {

       
        // database request
        $Users = $doc->getRepository(User::class);

        // setTime of users
        $user = new User();
        $user->setPoints($points);
        // persist
        $dc = $doc->getManager();

        // pushs
        $dc->persist($user);
        $dc->flush();

    }

    // this methods allow the angular to fetch the current user points related to and id
    /**
     * @Route("/getPoints/{id}", name="update_points")
     */
    public function getPointsById(UserRepository $repo, int $id, ManagerRegistry $doc)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        
       
        // database request
        $res = $repo->getPoints($id);
        
        
        $json = $serializer->serialize($res, 'json');
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
        

    }

    // this methods will update user points with id

    /**
     * @Route("/pushPoint/{id}/{points}", name="push_point")
     */
    public function pushPoint(int $id, int $points, ManagerRegistry $doc)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        
       
        // database request
        $Users = $doc->getRepository(User::class)->findOneBy(['id' => $id]);
        
        // set the new points value for the user
        $Users->setPoints($points);
        $dc = $doc->getManager();
        $dc->flush();
        
        $json = $serializer->serialize($Users, 'json');
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
        

    }

}