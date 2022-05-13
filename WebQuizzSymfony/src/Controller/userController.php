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


class userController extends AbstractController {

    /**
     * @Route("/getUsers", name="get_users")
     */
    public function getAllUsers(ManagerRegistry $doctrine) {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $questions = $doctrine->getRepository(User::class)->findAll();

        if (!$questions) {
            throw $this->createNotFoundException(
                'No Users found '
            );
        }

        $json = $serializer->serialize($questions, 'json');
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/users/add/", name="add_user")
     */
    public function addUser(ManagerRegistry $doc, Request $request)
    {

        $content = json_decode($request->getContent(), true);
        $updates = $content['updates'];
        $paramUsers = $updates[0];
        $paramPass = $updates[1];
        
        $users = $paramUsers['value'];
        $pass = $paramPass['value'];
       
        // database request
       $user = $doc->getRepository(User::class);

        // setTime of users
        $user = new User();
        $user->setEmail($users);
        $user->setPassword($pass);
        // persist
        $dc = $doc->getManager();

        // pushs
        $dc->persist($user);
        $dc->flush();

        $reponse = new Response();
        $reponse->setContent(json_encode([
            'email' => $users,
            'password' => $pass,     
        ]));
        
        return $reponse;
    }

}