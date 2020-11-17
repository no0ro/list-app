class ListsController < ApplicationController
    def index
        lists = List.all
        render json: lists
        # render json: {status: 'SUCCESS', message: 'Loaded all posts', data: lists}, status: :ok

      end
end
