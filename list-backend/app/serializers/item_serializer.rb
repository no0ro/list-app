class ItemSerializer
  include FastJsonapi::ObjectSerializer
  # specify what attributes we want to use
  attributes :name, :list_id, :lists, :created_at   

  belongs_to :list, serializer: ListSerializer

end
 