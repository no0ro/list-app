class ListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :items, :id

  has_many :items, serializer: ItemSerializer
  
end
