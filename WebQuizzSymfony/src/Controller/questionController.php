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
use App\Entity\Question;
use Symfony\Component\Routing\Annotation\Route;


class questionController extends AbstractController {

    /**
     * @Route("/getQuestions", name="get_questions")
     */
    public function getAllQuestions(ManagerRegistry $doctrine) {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $questions = $doctrine->getRepository(Question::class)->findAll();

        if (!$questions) {
            throw $this->createNotFoundException(
                'No questions found '
            );
        }

        $json = $serializer->serialize($questions, 'json');
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}