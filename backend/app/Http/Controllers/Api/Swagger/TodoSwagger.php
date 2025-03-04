<?php

namespace App\Http\Controllers\Api\Swagger;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="API de Lista de Tarefas",
 *     description="API para gerenciamento de tarefas (todos)",
 *     @OA\Contact(
 *         email="admin@example.com"
 *     )
 * )
 * 
 * @OA\Server(
 *     url="/api",
 *     description="API Server"
 * )
 * 
 * @OA\Schema(
 *     schema="Todo",
 *     required={"title"},
 *     @OA\Property(property="id", type="integer", format="int64", description="ID da tarefa"),
 *     @OA\Property(property="title", type="string", description="Título da tarefa"),
 *     @OA\Property(property="description", type="string", nullable=true, description="Descrição da tarefa"),
 *     @OA\Property(property="completed", type="boolean", description="Status de conclusão da tarefa"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 * 
 * @OA\Get(
 *     path="/todos",
 *     summary="Lista todas as tarefas",
 *     tags={"Tarefas"},
 *     @OA\Response(
 *         response=200,
 *         description="Lista de tarefas recuperada com sucesso",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Todo"))
 *     )
 * )
 * 
 * @OA\Post(
 *     path="/todos",
 *     summary="Cria uma nova tarefa",
 *     tags={"Tarefas"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"title"},
 *             @OA\Property(property="title", type="string", description="Título da tarefa"),
 *             @OA\Property(property="description", type="string", nullable=true, description="Descrição da tarefa"),
 *             @OA\Property(property="completed", type="boolean", default=false, description="Status de conclusão da tarefa")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Tarefa criada com sucesso",
 *         @OA\JsonContent(ref="#/components/schemas/Todo")
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Erro de validação"
 *     )
 * )
 * 
 * @OA\Get(
 *     path="/todos/{id}",
 *     summary="Obtém uma tarefa específica",
 *     tags={"Tarefas"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID da tarefa",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Tarefa encontrada",
 *         @OA\JsonContent(ref="#/components/schemas/Todo")
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Tarefa não encontrada"
 *     )
 * )
 * 
 * @OA\Put(
 *     path="/todos/{id}",
 *     summary="Atualiza uma tarefa existente",
 *     tags={"Tarefas"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID da tarefa",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="title", type="string", description="Título da tarefa"),
 *             @OA\Property(property="description", type="string", nullable=true, description="Descrição da tarefa"),
 *             @OA\Property(property="completed", type="boolean", description="Status de conclusão da tarefa")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Tarefa atualizada com sucesso",
 *         @OA\JsonContent(ref="#/components/schemas/Todo")
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Tarefa não encontrada"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Erro de validação"
 *     )
 * )
 * 
 * @OA\Delete(
 *     path="/todos/{id}",
 *     summary="Remove uma tarefa",
 *     tags={"Tarefas"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID da tarefa",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Tarefa removida com sucesso"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Tarefa não encontrada"
 *     )
 * )
 */
class TodoSwagger {} 