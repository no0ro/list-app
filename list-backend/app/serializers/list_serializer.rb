class ListSerializer
  include FastJsonapi::ObjectSerializer
  # specify what attributes we want to use
  attributes :title, :items, :created_at

  # attributes :title, :items, :id

  # has_many :items, serializer: ItemSerializer
  
end
