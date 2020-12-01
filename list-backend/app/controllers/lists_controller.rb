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

    def create 
      list = List.create(list_params) # List(id: integer, title: string, created_at: datetime, updated_at: datetime)
      # > list.title 
        # => "Test4"
     
      # Review.find_by(id: params[:id]) 
      items = params[:name].map { |itemName| Item.create(name: itemName)}
      # byebug
      # item = Item.find_or_create_by(name: params[:name]) 
      # params[:items].map{|item| dont need to iterate bc will only ever be adding 1 item at a time, despite the items attribute is an array on teh List obj. when submit, its always just 1 item 
      # > Item.find_by(name: params[:name]) 
        # => [["name", "item4"]

    
   
      list.items << items # add item to the items array
      # > list.items << item 
        # => [["name", "item 1"], ["list_id", 27], ["created_at", "2020-11-21 15:19:27.893634"], ["updated_at", "2020-11-21 15:19:27.893634"]]
        # => new item obj looks like: [#<Item id: 48, name: "item 1", list_id: 27, created_at: "2020-11-21 15:19:27", updated_at: "2020-11-21 15:19:27">]
      
      list.save
      render json: ListSerializer.new(list)
    end 

    def destroy  
      list = List.find_by(id: params[:id])
      list.destroy 
      render json: ListSerializer.new(list)

    end 


    private
    def list_params
      params.require(:list).permit(:title)
    end 
end
