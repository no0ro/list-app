class ListSerializer
  include FastJsonapi::ObjectSerializer
  # specify what attributes we want to use
  attributes :id, :title, :items, :created_at

  has_many :items, serializer: ItemSerializer
  
end
