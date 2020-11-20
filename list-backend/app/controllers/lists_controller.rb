class ListsController < ApplicationController
    def index
      lists = List.all
      render json: ListSerializer.new(lists)
        # render json: {status: 'SUCCESS', message: 'Loaded all posts', data: lists}, status: :ok
    end

    def show
      list = List.find_by(id: params[:id])
      render json: ListSerializer.new(list)
    end


    private
    def list_params
      params.require(:list).permit(:title)
    end 
end
