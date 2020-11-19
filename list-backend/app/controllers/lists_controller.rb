class ListsController < ApplicationController
    def index
      lists = List.all
      # options = {
      #   include: [:item]
      # }

      render json: ListSerializer.new(lists)
        # render json: {status: 'SUCCESS', message: 'Loaded all posts', data: lists}, status: :ok
    end


    def show
      list = List.find_by(id: params[:id])
      # options = {
      #   include: [:item]
      # }
      render json: ListSerializer.new(list)
    end

    # def new /create 



        # def index
    #   render jsonapi: Posts.all, include: [:author, comments: [:author]],
    #          fields: { users: [:name, :email],
    #                    posts: [:title, :content] }
    # end


    private
    def list_params
      params.require(:list).permit(:title)
    end 
end
