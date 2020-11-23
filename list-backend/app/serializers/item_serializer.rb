class ItemSerializer
  include FastJsonapi::ObjectSerializer
  # specify what attributes we want to use
  attributes :id, :name, :list_id, :list
  # remove :list if things get weird

  belongs_to :list, serializer: ListSerializer

end
 