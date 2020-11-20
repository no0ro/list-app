class ItemsController < ApplicationController
    def index
        items = Item.all
        # options = {
        #   include: [:item]
        # }
  
        render json: ListSerializer.new(items)
          # render json: {status: 'SUCCESS', message: 'Loaded all posts', data: lists}, status: :ok
      end


      def show
        item = List.find_by(id: params[:id])
        # options = {
        #   include: [:item]
        # }
        render json: ListSerializer.new(item)
      end

end
