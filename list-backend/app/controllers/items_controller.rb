class ItemsController < ApplicationController
  def index
      items = Item.all
      options = {
        include: [:list]
      }

      render json: ItemSerializer.new(items, options)
        # render json: {status: 'SUCCESS', message: 'Loaded all posts', data: lists}, status: :ok
    end


  def show
    item = Item.find_by(id: params[:id])
    options = {
      include: [:list]
    }
    render json: ItemSerializer.new(item, options)
  end
end
